import React from "react"
import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div className="border-b-2 p-2 flex justify-between gap-2">
            <div className="text-3xl font-bold font-blog">Header</div>
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
