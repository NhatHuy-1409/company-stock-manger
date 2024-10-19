function convertDateFormat(dateStr) {
    const [day,month,year] = dateStr.split("/")
    return `${year}-${month}-${day}`
  }

export function calculateDaysBetween(date1,date2 = new Date()) {
// Chuyển đổi chuỗi ngày tháng năm thành đối tượng Date
const formattedDate1 = convertDateFormat(date1) // Chuyển đổi định dạng
const d1 = new Date(formattedDate1)
const d2 = new Date(date2)

// Tính chênh lệch thời gian giữa hai ngày (đơn vị là millisecond)
const timeDifference = Math.abs(d2 - d1)

// Chuyển đổi chênh lệch thời gian từ millisecond sang ngày
const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
return dayDifference
}