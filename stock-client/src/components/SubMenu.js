import * as React from "react"
import PropTypes from "prop-types"
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  Icon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core"
import { getItemTypes } from "../meta-data/item-types"
import { getStatuses, getStocks } from "../api/stock-manager"
import { useEffect } from "react"

// This function checks whether a point (x, y) is on the left or right side of a line formed by two points (px, py) and (qx, qy).
// If the result is negative, the point is on the right side of the line. If positive, it's on the left side.
// It helps us determine if a point is on the same side as a vertex of the triangle when compared to its edges.
function sign(px, py, qx, qy, rx, ry) {
  return (px - rx) * (qy - ry) - (qx - rx) * (py - ry)
}

// This function checks if a point (x, y) is inside a triangle formed by three points (x1, y1), (x2, y2), and (x3, y3).
function pointInTriangle(currentMouseCoordinates, triangleCoordinates) {
  const [[x1, y1], [x2, y2], [x3, y3]] = triangleCoordinates
  const [x, y] = currentMouseCoordinates

  const b1 = sign(x, y, x1, y1, x2, y2) <= 0
  const b2 = sign(x, y, x2, y2, x3, y3) <= 0
  const b3 = sign(x, y, x3, y3, x1, y1) <= 0
  // If all signs are the same (either all negative or all positive), the point is inside the triangle.
  return b1 === b2 && b2 === b3
}

function SubMenu({ nameFilter, options, menuLevels, onOptionClick }) {
  const [anchors, setAnchors] = React.useState({
    elements: new Array(menuLevels).fill(null),
    options: new Array(menuLevels).fill(null),
  })

  const mouseEntered = React.useRef({})
  const mouseLeftCordinates = React.useRef([])
  const buttonRef = React.useRef(null)
  const mouseIdleTimer = React.useRef(null)

  const handleOpen = (event, level = 0, nestedOptions = options) => {
    const target = event.target

    setAnchors((prevAnchors) => ({
      elements: prevAnchors.elements.map((element, index) =>
        index === level ? target : element
      ),
      options: prevAnchors.options.map((element, index) =>
        index === level ? nestedOptions : element
      ),
    }))
  }

  const handleClose = (level) => {
    setAnchors((prevAnchors) => ({
      elements: prevAnchors.elements.map((element, index) =>
        index >= level ? null : element
      ),
      options: prevAnchors.options.map((element, index) =>
        index >= level ? null : element
      ),
    }))
  }

  const handleClickAway = (event) => {
    if (event.target === buttonRef.current) {
      handleClose(0)
      return
    }

    const optionWithoutSubMenu = anchors.elements.every(
      (element) => !event.composedPath().includes(element)
    )

    if (optionWithoutSubMenu) {
      handleClose(0)
    }
  }

  const handleClickOption = (option) => {
    if (!option.nestedOptions) {
      handleClose(0)
      onOptionClick(option)
    }
  }

  const handleMouseMove = (event, option, optIndex) => {
    let shouldComputeSubMenuOpenLogic = true
    const submenu = document.querySelector(
      `#nested-menu-${option.menuLevel + 1}`
    )

    function computeSubMenuLogic() {
      if (!mouseEntered.current[getId(option, optIndex)]) {
        mouseEntered.current[getId(option, optIndex)] = true
        // Close all prior submenus if the mouse transitions from an option with a submenu to an option without a submenu.
        if (!option.nestedOptions) {
          handleClose(option.menuLevel + 1)
        } else if (
          // If the mouse moves from an option with a submenu to another option with a submenu, open the submenu of the current option and close the submenu of the previous option.
          option.nestedOptions &&
          anchors.options[option.menuLevel + 1] &&
          !option.nestedOptions.every(
            (val, i) =>
              val.value === anchors.options[option.menuLevel + 1]?.[i].value
          )
        ) {
          handleClose(option.menuLevel + 1)
          handleOpen(event, option.menuLevel + 1, option.nestedOptions)
        } else {
          handleOpen(event, option.menuLevel + 1, option.nestedOptions)
        }
      }
    }

    if (mouseLeftCordinates.current.length > 0 && submenu) {
      const { x, y, height } = submenu.getBoundingClientRect()

      // Form a virtual triangle using the left mouse coordinates and the top-left and bottom-left coordinates of the submenu. If the current mouse coordinates fall within this triangle, skip the submenu logic computation.
      // Check https://twitter.com/diegohaz/status/1283558204178407427 for more context.
      const currentMouseCoordinates = [event.clientX, -event.clientY]
      const virtualTriangleCordinates = [
        [x, -y],
        [x, -(y + height)],
        [mouseLeftCordinates.current[0], mouseLeftCordinates.current[1]],
      ]

      if (pointInTriangle(currentMouseCoordinates, virtualTriangleCordinates)) {
        shouldComputeSubMenuOpenLogic = false
        if (mouseIdleTimer.current) {
          clearTimeout(mouseIdleTimer.current)
        }

        // if mouse is inside triangle and yet hasn't moved, we need to compute submenu logic after a delay
        mouseIdleTimer.current = setTimeout(() => {
          computeSubMenuLogic()
        }, 50)
      } else {
        shouldComputeSubMenuOpenLogic = true
      }
    }

    if (shouldComputeSubMenuOpenLogic) {
      if (mouseIdleTimer.current) {
        clearTimeout(mouseIdleTimer.current)
      }
      computeSubMenuLogic()
    }
  }

  const handleMouseLeave = (event, option, optIndex) => {
    mouseLeftCordinates.current = [event.clientX, -event.clientY]

    if (mouseIdleTimer.current) {
      clearInterval(mouseIdleTimer.current)
    }
    mouseEntered.current[getId(option, optIndex)] = false
  }

  const handleKeyDown = (event, option) => {
    if (option.nestedOptions) {
      if (event.key === "ArrowRight" || event.key === "Enter") {
        handleOpen(event, option.menuLevel + 1, option.nestedOptions)
      }
    }
    if (event.key === "ArrowLeft" && option.menuLevel > 0) {
      handleClose(option.menuLevel)
      anchors.elements[option.menuLevel]?.focus()
    }

    if (event.key === "Escape") {
      handleClose(0)
    }
  }

  const getId = (option, index) => {
    return `${index}-${option.menuLevel}`
  }

  return (
    <React.Fragment>
      <Button
        ref={buttonRef}
        onClick={(event) => {
          handleOpen(event)
        }}
      >
        {nameFilter}
      </Button>

      {anchors.elements.map((anchorElement, index) =>
        anchorElement ? (
          <Popper
            open={Boolean(anchorElement)}
            anchorEl={anchorElement}
            key={`${anchorElement.innerText} menu`}
            role={undefined}
            placement={index > 0 ? "right-start" : "bottom-start"}
            transition
          >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: "left top",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <MenuList
                      autoFocusItem={Boolean(anchorElement)}
                      id={`nested-menu-${index}`}
                      aria-labelledby="nested-button"
                    >
                      {(anchors.options[index] ?? []).map(
                        (option, optIndex) => (
                          <MenuItem
                            key={option.value}
                            aria-haspopup={!!option.nestedOptions ?? undefined}
                            aria-expanded={
                              option.nestedOptions
                                ? anchors.elements.some(
                                    (element) =>
                                      element?.innerText === option.value
                                  )
                                : undefined
                            }
                            onClick={() => handleClickOption(option)}
                            onMouseMove={(event) =>
                              handleMouseMove(event, option, optIndex)
                            }
                            onMouseLeave={(event) =>
                              handleMouseLeave(event, option, optIndex)
                            }
                            onKeyDown={(event) => handleKeyDown(event, option)}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                alignItems: "center",
                              }}
                            >
                              <Typography>{option.value}</Typography>
                              {option.nestedOptions ? (
                                <Icon fontSize="small" />
                              ) : null}
                            </Box>
                          </MenuItem>
                        )
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        ) : null
      )}
    </React.Fragment>
  )
}

SubMenu.propTypes = {
  menuLevels: PropTypes.number.isRequired,
  onOptionClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      menuLevel: PropTypes.number.isRequired,
      nestedOptions: PropTypes.arrayOf(PropTypes.object),
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default function NestedMenu({
  nameFilter,
  setNameFilter,
  menu,
  list = [],
  setList,
  setTypeFilter,
  setStatusFilter,
  setStockFilter,
  itemTypes,
  itemStatuses,
  itemStocks,
}) {
  function findAttributeByValue(array, value) {
    let result = null

    array.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (item[key] === value) {
          result = key
        }
      })
    })

    return result
  }

  const handleClickOption = (option) => {
    setNameFilter(option.value)

    if (option.value === "Tất cả") {
      setList(list)
      setTypeFilter(null)
      setStatusFilter?.(null)
      setStockFilter?.(null)
    } else {
      const attributes = findAttributeByValue(list, option.value)

      if (attributes === "type") {
        const itemFilter = itemTypes?.filter(
          (item) => item.label === option.value
        )
        setTypeFilter(itemFilter[0].value)
        setStatusFilter?.(null)
        setStockFilter?.(null)
      } else if (attributes === "status") {
        const itemFilter = itemStatuses?.filter(
          (item) => item.name === option.value
        )
        setStatusFilter(itemFilter[0].id)
        setTypeFilter(null)
        setStockFilter(null)
      } else if (attributes === "stock") {
        const itemFilter = itemStocks?.filter(
          (item) => item.name === option.value
        )
        setStockFilter(itemFilter[0].id)
        setTypeFilter(null)
        setStatusFilter(null)
      } else {
        setList([])
        // setTypeFilter?.(null)
        // setStatusFilter?.(null)
        // setStockFilter?.(null)
      }
    }
  }

  return (
    <SubMenu
      nameFilter={nameFilter}
      options={menu}
      menuLevels={3}
      onOptionClick={handleClickOption}
    />
  )
}