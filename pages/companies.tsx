import styles from '../styles/Companies.module.css'
import Navbar from '../components/navbar'
import { useState } from 'react'

const Companies = () => {

    const companies = [
        {
            name: 'Google',
            balance: '90'
        },
        {
            name: 'Facebook',
            balance: '103'
        },
        {
            name: 'Apple',
            balance: '56'
        },
        {
            name: 'Amazon',
            balance: '75'
        },
        {
            name: 'Microsoft',
            balance: '201'
        },
        {
            name: 'Tesla',
            balance: '67'
        },
    ]

    const [searchValue, setSearchValue] = useState('')

    const filteredCompanies = companies.filter((company) => {
        return company.name.toLowerCase().includes(searchValue.toLowerCase())
    })

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>$5,674 Locked</h1>
                <input onChange={(e) => setSearchValue(e.target.value)} className={styles.input} placeholder='Company' />
                <div className={styles.grid}>
                    {filteredCompanies.map((company, index) => {
                        return (
                            <div key={index} className={styles["grid-item"]}>
                                <h1 className={styles.name}>{company.name}</h1>
                                <h2 className={styles.bal}>${company.balance}</h2>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Companies