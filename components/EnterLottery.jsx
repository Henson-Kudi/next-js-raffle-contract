import React, { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { useNotification } from "web3uikit"
import { abi, contractAddresses } from "../constants"
import { ethers } from "ethers"

export default function EnterLottery() {
    const [entranceFee, setEntranceFee] = useState(0)

    const [numPlayers, setNumPlayers] = useState(0)
    const [recentWinner, setRecentWinner] = useState("0")

    const [formattedEther, setFormattedEther] = useState()

    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()

    const dispatch = useNotification()

    const chainId = parseInt(chainIdHex)

    const raffleAddress = chainId in contractAddresses && contractAddresses[chainId][0]

    const { runContractFunction: enterLottery } = useWeb3Contract({
        abi: abi,
        functionName: "enterRaffle",
        contractAddress: raffleAddress,
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        functionName: "getEntranceFee",
        contractAddress: raffleAddress,
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        functionName: "getNumberOfPlayers",
        contractAddress: raffleAddress,
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        functionName: "getRecentWinner",
        contractAddress: raffleAddress,
        params: {},
    })

    const updateUI = async () => {
        const entranceFee = await getEntranceFee()

        const numberOfPlayers = await getNumberOfPlayers()

        const recentWinner = await getRecentWinner()

        setEntranceFee(entranceFee)

        setNumPlayers(numberOfPlayers.toString())

        setRecentWinner(recentWinner.toString())

        setFormattedEther(ethers.utils.formatUnits(entranceFee, "ether"))
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        await tx.wait(1)

        handleNotification(tx)

        updateUI()
    }

    const handleEnterLottery = async () => {
        await enterLottery({
            onSuccess: handleSuccess,
            onError: (err) => console.log(err),
        })
    }

    const handleNotification = async (tx) => {
        await tx.wait(1)
        handleNotificationSuccess()
    }

    const handleNotificationSuccess = () => {
        dispatch({
            message: "Transaction succeeded",
            title: "Success",
            position: "topR",
            type: "success",
            icon: "bell",
            iconColor: "rgba(10, 20,30)",
        })
    }

    return (
        <div>
            {raffleAddress ? (
                <div className="text-sm">
                    <div>Enterance fee, {formattedEther} </div>
                    <button
                        className="border p-2 rounded text-m font-semibold cursor-pointer bg-mine hover:bg-mine2 transition-all duration-250 ease-linear"
                        onClick={handleEnterLottery}
                    >
                        Enter Lottery
                    </button>
                    <div>{numPlayers} players</div>
                    <div>recennt winner : {recentWinner}</div>
                </div>
            ) : (
                <div>No raffle address detected</div>
            )}
        </div>
    )
}
