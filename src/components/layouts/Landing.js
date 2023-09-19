import React, { useEffect, useState } from 'react'
import BaseLayout from '../commonlayout/BaseLayout';
import Orders from './Orders';
import { useFormik } from "formik";
import classnames from 'classnames';
import { Loading, Notify, Report } from 'notiflix';
import axios from 'axios';
import { API_URL, PLUGIN_CONTRACT, PLUGIN_FDC_CONTRACT, USDT_CONTRACT, USDT_RECEIVE_ADDRESS, getTxnStatus } from '../../Globals/constant';
import {
  connectWallet,
  createWeb3Provider,
  createContractInstance,
  executeTransaction,
  queryData,
  queryEvents,
  convertPriceToEth,
  convertPricefromEth

} from 'react-solidity-web3-v2';
import PLIABI from "../../contracts/abi.json"
import FDCABI from "../../contracts/FDC.json"

const yup = require('yup')



const validationSchema = yup.object({
  walletAddress: yup.string()
    .required('Address is required')
    .matches(/^(0x)?[0-9a-fA-F]{40}$/, 'Invalid Ethereum address'),
  userID: yup.string().required('Required field'),
  packageID: yup.string().required('Required field'),
  packagePrice: yup.string().required('Required field'),
})


export default function Landing() {

  const [connected, setconnected] = useState(false)
  const [provider, setprovider] = useState(null)
  const [signer, setsigner] = useState(null)
  const [address, setaddress] = useState(null)
  const [plugincontract, setplugincontract] = useState(null)
  const [fdccontract, setfdccontract] = useState(null)
  const [plibalance, setplibalance] = useState(0)


  const INITIAL_VALUES = {
    walletAddress: "",
    userID: "1001",
    packageID: "2222",
    packagePrice: "100",
  }

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: (values) => {
      onApprove(values)
    },
    validationSchema
  })

  const onConnect = async () => {
    var connectOptions = {
      rpcObj: {
        50: "https://rpc.xinfin.network",
        51: "https://erpc.apothem.network"
      },
      network: "mainnet",
      toDisableInjectedProvider: true
    }

    //Web3Modal Wallet Connect
    const instance = await connectWallet(connectOptions);

    //Get Provider and Signer
    const { provider, signer } = await createWeb3Provider(instance);

    //Get the connected wallet address
    const address = await signer.getAddress()


    //Initialise the contract
    const initPliContract = await createContractInstance(PLUGIN_CONTRACT, PLIABI, signer);
    const initFdcContract = await createContractInstance(PLUGIN_FDC_CONTRACT, FDCABI, signer);


    //SETTING ALL THE VALUES 

    setprovider(provider)
    setsigner(signer)
    setaddress(address)
    formik.setFieldValue("walletAddress", address)
    setplugincontract(initPliContract)
    setfdccontract(initFdcContract)
    setconnected(true)
  }

  const onApprove = async (values) => {
    Loading.standard("Please Wait...")
    //Convert TO ETH 
    var tokens = convertPriceToEth(values.packagePrice, "PLI")

    //Approve Transaction
    var transactionHash = await plugincontract.approve(fdccontract.address, tokens)

    // let approveTxn = await executeTransaction(plugincontract, provider, 'approve', [fdccontract.address, tokens]);
    // console.log("approveTxn", approveTxn.txHash)

    //Check the Txn Status
    const [txhash, status] = await getTxnStatus(transactionHash.hash, provider);
    if (!status) {
      Loading.remove()
      Notify.failure("Error Occured Try Again")
      return
    }
    // Loading.remove()

    onPurchase(values, tokens)
  }

  const onPurchase = async (values, tokens) => {
    //delayCompensation
    var delayTxn = await executeTransaction(fdccontract, provider, 'delayCompensation', [values.userID, values.packageID, values.walletAddress, tokens]);
    console.log('delayTxn', delayTxn.txHash)
    //Check the Txn Status
    const [txhash, status] = await getTxnStatus(delayTxn.txHash, provider);
    if (!status) {
      Loading.remove()
      Notify.failure("Error Occured Try Again")
      return
    }

    Loading.remove()
    Report.success(
      'Success',
      'Insurance Purchase Done Successfully',
      'Okay',
      () => {
        getPLIBalance()
      }
    );

  }


  const getPLIBalance = async () => {
    let balance = await queryData(plugincontract, provider, 'balanceOf', [address]);
    let comp = await queryData(fdccontract, provider, 'passengerCompDetails', [1]);
    console.log("comp", comp)
    let finalBalance = await convertPricefromEth(balance)
    setplibalance(finalBalance)
  }

  useEffect(() => {
    if (connected) {
      getPLIBalance()
    }
  }, [connected])

  return (
    <BaseLayout>
      <div className="container-xl">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-4">
            <div className="card quick-trad">

              <div className="card-body">
                <div className="tab-content">
                  <form className="form" onSubmit={formik.handleSubmit}>

                    <div className="form-group">
                      <div className="cfs-16 mb-1 fw-bold d-block">Wallet Address</div>
                      <div className="input-group">
                        <input
                          type="text"
                          id="walletAddress"
                          name="walletAddress"
                          value={formik.values.walletAddress}
                          placeholder=""
                          disabled
                          className={classnames('form-control', {
                            'is-invalid': formik.errors.walletAddress
                          })}
                        />
                        {formik.errors.walletAddress && (<div className="invalid-feedback text-left text-danger">{formik.errors.walletAddress}</div>)}
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="cfs-16 mb-1 fw-bold d-block">User ID</div>
                      <div className="input-group">

                        <input
                          type="text"
                          id="userID"
                          name="userID"
                          value={formik.values.userID}
                          placeholder=""
                          onChange={formik.handleChange}
                          className={classnames('form-control', {
                            'is-invalid': formik.errors.userID
                          })}
                        />
                        {formik.errors.userID && (<div className="invalid-feedback text-left text-danger">{formik.errors.userID}</div>)}
                      </div>
                    </div>


                    <div className="form-group mt-2">
                      <div className="cfs-16 mb-1 fw-bold d-block">Package ID</div>
                      <div className="input-group">
                        <input
                          name="packageID"
                          id="packageID"
                          onChange={formik.handleChange}
                          value={formik.values.packageID}
                          type="number"
                          placeholder=""
                          className={classnames('form-control', {
                            'is-invalid': formik.errors.packageID
                          })}

                        />
                        {formik.errors.packageID && (<div className="invalid-feedback text-left text-danger">{formik.errors.packageID}</div>)}

                      </div>
                    </div>

                    <div className="form-group mt-2">
                      <div className="cfs-16 mb-1 fw-bold d-block">Package Price</div>
                      <div className="input-group">
                        <input
                          name="packagePrice"
                          id="packagePrice"
                          onChange={formik.handleChange}
                          value={formik.values.packagePrice}
                          type="number"
                          placeholder=""
                          className={classnames('form-control', {
                            'is-invalid': formik.errors.packagePrice
                          })}

                        />
                        {formik.errors.packagePrice && (<div className="invalid-feedback text-left text-danger">{formik.errors.packagePrice}</div>)}

                      </div>
                    </div>

                    <React.Fragment>
                      <div className="my-3 sub-text">
                        <div className="d-flex mb-2 justify-content-between">
                          <p>PLI Balance in Your Wallet</p>
                          <p>{plibalance} PLI</p>
                        </div>
                      </div>
                    </React.Fragment>

                    <div className="form-group mt-3">
                      {connected ? <input
                        type="submit"
                        className="form-control btn btn-primary border-0"
                        defaultValue="Buy now"
                      /> : <button
                        onClick={() => onConnect()}
                        type="button"
                        className="form-control btn btn-primary border-0" >
                        Connect Wallet
                      </button>}
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

    </BaseLayout>

  )
}




