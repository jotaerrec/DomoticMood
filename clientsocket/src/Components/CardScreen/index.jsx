import React from 'react'
import styles from "./styles.module.scss";

const CardScreen = ({ data }) => {
    return (
        <div>{data.section}</div>
    )
}

export default CardScreen