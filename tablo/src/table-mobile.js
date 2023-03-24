// import "./css/table.css"

export default function TableMobile({ head, body }) {
    return (
        <div className="MobileDiv">
            {body.map((items, key) => (
                <section className="phone">
                    {items.map(item => (
                        <div className="bha">
                            {Array.isArray(item) ? (
                                <div className="hus">
                                    {item}
                                </div>
                            ) : item}
                            {/* {item} */}
                        </div>
                    ))}
                </section>
            ))}
        </div>
    )
}