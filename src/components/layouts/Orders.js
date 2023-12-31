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
                                    <td className="border-0">User ID</td>
                                    <td className="border-0">Package ID</td>
                                    <td className="border-0">Package Price</td>
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




