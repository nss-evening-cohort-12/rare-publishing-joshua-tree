import React, { useContext, useEffect } from "react"
import { SubscriptionContext } from "./SubscriptionProvider"

export const SubscriptionList = props => {
    const { subscriptions, getMySubscriptions } = useContext(SubscriptionContext)

    useEffect(() => {
        const userId = parseInt(localStorage.getItem("rare_user_id"))
        getMySubscriptions(userId)
    }, [])

    return (
        <div style={{ margin: "0rem 3rem"}}>
            <h1>My Subscriptions</h1>

            <article className="subscriptions">
                {
                    subscriptions.map(subscription => {
                        return <section className="subscriptions" key={subscription.id}>
                        <h3>Placeholder for post by {subscription.author_id.display_name}.</h3>
                        </section>
                    })
                }
            </article>
        </div>
    )
}
