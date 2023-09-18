import moment from 'moment';
import React from 'react'

export default function Orders({ order }) {

    return (
        <div className="col-lg-8 col-sm-8">
            <div className="card wallet-history">
                <div className="card-header">
                    <h4 className="card-title">Latest Transactions</h4>
                </div>
                <div className="card-body ch-table">
                    <div className="table-responsive">
                        {/* table-striped bg-table-striped-bitcoin */}
                        <table className="table mb-0 align-middle table-borderless cmw-30">
                            <thead className="align-middle">
                                <tr className="text-muted">
                                    <td className="border-0">ID</td>
                                    <td className="border-0">Date</td>
                                    <td className="border-0">You Paid</td>
                                    <td className="border-0">Pay Status</td>
                                    <td className="border-0">You Receive</td>
                                    <td className="border-0">Send Status</td>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    )
}




