export const NORMAL_STATUS = 'NORMAL'
export const CLOSED_STATUS = 'CLOSED'
export const FAULT_STATUS = 'FAULT'

export const getCheckpointStatus = (type) => {
  switch (type) {
    case NORMAL_STATUS:
      return '正常'
    case CLOSED_STATUS:
      return '锁定'
    case FAULT_STATUS:
      return '离线'
    default:
      return '未知状态'
  }
}
