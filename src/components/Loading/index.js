import { Spin } from 'antd';
import React from 'react'
import styles from './index.css'

export default function index() {
    return (
        <div className={styles.loading_box}>
            <Spin tip="Loading..." spinning={false}>
            </Spin>
        </div>
    )
}
