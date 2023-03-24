import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import "./css/table.css"
import {FaSortDown, FaSortUp, FaSort} from "react-icons/fa"
import {useMediaQuery, useMediaQueries} from '@react-hook/media-query'
import TableMobile from "./table-mobile"


export default function Table({ head, body, searchable }) {

    const isMobile = useMediaQuery('(max-width: 500px)')
    

    const [sorting, setSorting] = useState(false)
    const [search, setSearch] = useState ("")
    const filteredData = body && body.filter(
        items => items.some(item => item.toString().toLocaleLowerCase("TR").includes(search.toLocaleLowerCase("TR")))
        ).sort((a, b) => {
            if (sorting?.orderBy === "asc") {
                return a[sorting.key].toString().localeCompare(b[sorting.key])
            }
            if (sorting?.orderBy === "desc") {
                return b[sorting.key].toString().localeCompare(a[sorting.key])
            }
        })

    if (!body || body?.length === 0) {
        return (
            <div className="notDefined p-3">Gösterilecek veri bulunmuyor.</div>
        )
    }

    
    return (
        <>
        {searchable && (
            <div className="tableSearch">
                <input 
                value={search}
                onChange={e => setSearch(e.target.value)} 
                type="text" 
                placeholder="tabloda ara" 
                className="p-1"/>
                {sorting && (
                    <button
                        onClick={() => setSorting(false)}
                        className="arrangement">
                        sıralamayı iptal et
                    </button>
                )
                }
            </div>
        )}
        {isMobile && <TableMobile head={head} body ={filteredData} />}
        {!isMobile && ( 
            <div>
            <table className="table">
                <thead>
                    <tr>
                        {head.map((h, key) => (
                            <th
                            className="p-3" 
                            key={key}>
                                <div className="inline-flex">
                                {h.name}
                                {h.sortable && (
                                    <button onClick={() => {
                                        if (sorting?.key === key) {
                                            setSorting( {
                                                key,
                                                orderBy: sorting.orderBy === "asc" ? "desc" : "asc"
                                            })
                                        } else {
                                            setSorting({
                                                key,
                                                orderBy: "asc"
                                            })
                                        }
                                    }}>
                                        {sorting?.key === key && (
                                            sorting.orderBy === "asc" ? <FaSortDown size={14} /> : <FaSortUp size={14} />
                                        )}
                                        {sorting?.key !== key && <FaSort size={14}/>}
                                    </button>
                                )}
                                </div>
                                </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    { filteredData.map((items, key) => (   
                    <tr className="group" key={key}>
                        {items.map((item, key)=>(
                            <td 
                                className="p-3"
                                key={key}>
                                    
                        {Array.isArray(item) ? (
                            <div>
                                {item}
                            </div>
                        ) : item}
                        {/* {item} */}
                            </td>
                        ))}
                     </tr>
                    ))}
                </tbody>
            </table>
            </div>
        )}
        
        </>
    )
    
}