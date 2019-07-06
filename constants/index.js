import React from 'react'
import { Icon } from '@ant-design/react-native'

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

export const getCheckpointIcon = (type) => {
  switch (type) {
    case NORMAL_STATUS:
      return <Icon color="green" name="check-square" />
    case CLOSED_STATUS:
      return <Icon color="red"  name="lock" />
    case FAULT_STATUS:
      return <Icon color="red" name="info-circle" />
    default:
      return null
  }
}

export const PLATE_COLORS = [
  {
    label: '黄车牌',
    value: 'yellow'
  },
  {
    label: '蓝车牌',
    value: 'blue'
  },
  {
    label: '新能源车牌',
    value: 'green'
  }
];
