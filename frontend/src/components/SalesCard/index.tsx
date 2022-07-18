import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Sale } from "../../models/sale";
import { BASE_URL } from "../../util/request";
import NotificationButton from '../NotificationButton';
import './styles.css';

function SalesCard() {

    const min = new Date(new Date().setDate(new Date().getDate() - 365));

    const [mindate, setMindate] = useState(min);
    const [maxdate, setMaxdate] = useState(new Date());
    const [sales, setSales] = useState<Sale[]>([]);
    useEffect(() => {
        axios.get(`${BASE_URL}/movies`)
            .then(response => {
                setSales(response.data.content)
            });
    }, []);
    return (
        <>
            <div className="dsmeta-card">
                <h2 className="dsmeta-sales-title">Vendas</h2>
                <div>
                    <div className="dsmeta-form-control-container">
                        <DatePicker
                            selected={mindate}
                            onChange={(date: Date) => setMindate(date)}
                            className="dsmeta-form-control"
                            dateFormat="dd/MM/yyyy"
                        />                    </div>
                    <div className="dsmeta-form-control-container">
                        <DatePicker
                            selected={maxdate}
                            onChange={(date: Date) => setMaxdate(date)}
                            className="dsmeta-form-control"
                            dateFormat="dd/MM/yyyy"
                        />                    </div>
                </div>

                <div>
                    <table className="dsmeta-sales-table">
                        <thead>
                            <tr>
                                <th className="show992">ID</th>
                                <th className="show576">Data</th>
                                <th>Vendedor</th>
                                <th className="show992">Visitas</th>
                                <th className="show992">Vendas</th>
                                <th>Total</th>
                                <th>Notificar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sales.map(sale => {
                                    return (
                                        <tr key={sale.id}>
                                            <td className="show992">#341</td>
                                            <td className="show576">08/07/2022</td>
                                            <td>{sale.title}</td>
                                            <td className="show992">15</td>
                                            <td className="show992">11</td>
                                            <td>R$ 55300.00</td>
                                            <td>
                                                <div className="dsmeta-red-btn-container">
                                                    <NotificationButton />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>
                </div>

            </div>
        </>
    )
}

export default SalesCard;