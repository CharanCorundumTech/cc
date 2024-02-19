import { Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import './FlagPage.css'
import apiConfig from '../env'
const FlagPage = ({ id }) => {
    console.log(id)
    const [comment, setComment] = useState('')
    const [value, setValue] = useState('Not Yours')
    const selecthandle = (e) => {
        setValue(e.target.value)
    }


    const role = localStorage.getItem('role')
    const flagFunction = () => {
        if (role === 'user') {
            const payload = {
                "postId": id,
                "comments": comment,
                "reason": value
            }
            const token = localStorage.getItem('token')
            axios.post(`${apiConfig.baseUrl}/userAddFlag`, payload, {
                headers: {
                    Authorization: token, // Make sure to replace 'Token' with the actual token value
                }
            })
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        alert("Flagged this Data")
                        window.location.reload()
                    }
                    // setCardData(response.data)
                }).catch((error) => {
                    if (error.response.status === 409) {
                        alert("Already Flagged")
                        window.location.reload()
                    }

                })

        } else {
            const payload = {
                "postId": id,
                "comments": comment,
                // "reason":value
            }
            const token = localStorage.getItem('token')
            axios.post(`${apiConfig.baseUrl}/superiorAddFlag`, payload, {
                headers: {
                    Authorization: token, // Make sure to replace 'Token' with the actual token value
                }
            })
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        alert("Flagged this Data")
                        window.location.reload()
                    }
                    // setCardData(response.data)
                }).catch((error) => {
                    if (error.response.status === 409) {
                        alert("Already Flagged")
                        window.location.reload()
                    }

                })

        }

    }

    console.log(value)
    const RejectFunction = () => {
        const payload = {
            "postId": id,
            "comments": comment,
            // "reason":value
        }
        console.log(comment)
        console.log(id)
        const token = localStorage.getItem('token')
        axios.post(`${apiConfig.baseUrl}/superiorRejectFlag`, payload, {
            headers: {
                Authorization: token, // Make sure to replace 'Token' with the actual token value
            }
        })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    alert("Rejected this Data")
                    window.location.reload()
                }
                // setCardData(response.data)
            }).catch((error) => {
                if (error.response.status === 409) {
                    alert("Already Flagged")
                }
            })
    }

    return (
        <>
            {/* <h4>Flag User</h4> */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "80%", width: "100%", alignItems: "center" }}>
                <h4><b>Flag User</b></h4>
                <div style={{ height: "300px", borderRadius: "10px", backgroundColor: "white", width: "500px", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center", flexDirection: "column", border: "0px solid black", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                    {/* <h3>flagging page</h3> */}
                    {role === 'user' &&
                        <div style={{ display: "flex", marginTop: "20px" }}>
                            <h5 style={{ fontWeight: 'bold' }}>Select Voilation Type :</h5>
                            <select value={value} style={{ width: "150px", height: "30px", borderRadius: "10px" }} onChange={(e) => { selecthandle(e) }}>

                                <option disabled>select the reason</option>
                                <option value='Not Yours'>Not Yours</option>
                                <option value='Prohibited content: explicit, harmful, divisive'>Prohibited content: explicit, harmful, divisive</option>
                                <option value='Child-harmful'>Child-harmful</option>
                                <option value='Misinformation Deception'>Misinformation Deception</option>
                                <option value='Impersonation'>Impersonation</option>
                                <option value='Rights infringement.'>National threat</option>
                                <option value='Malicious code'>Malicious code</option>
                            </select>

                        </div>
                    }
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <label>Comment :</label>
                        <textarea style={{ height: "40px" }} rows={4} onChange={(e) => { setComment(e.target.value) }} placeholder='write comment...' />
                    </div>
                    {/* <Button className='flag_btns1' onClick={AprroveFunction}>Arrove</Button> */}
                    <button className='flag_btns2' onClick={flagFunction}>Flag</button>
                    {
                        role !== 'user' &&
                        <button className='flag_btns3' onClick={RejectFunction}>Reject</button>

                    }
                </div>
            </div>
        </>
    )
}

export default FlagPage