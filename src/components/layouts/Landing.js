import React, { useEffect, useState } from 'react'
import BaseLayout from '../commonlayout/BaseLayout';
import Orders from './Orders';
import { useFormik } from "formik";
import classnames from 'classnames';
import { Loading, Notify, Report } from 'notiflix';
import axios from 'axios';
import { API_URL, USDT_CONTRACT, USDT_RECEIVE_ADDRESS } from '../../Globals/constant';
import { convertPriceToEth, convertPricefromEth, executeTransaction } from 'react-solidity-web3-v2';
import { ethers } from 'ethers'
const yup = require('yup')



const validationSchema = yup.object({
  walletAddress: yup.string()
    .required('Address is required')
    .matches(/^(0x)?[0-9a-fA-F]{40}$/, 'Invalid Ethereum address'),
  email: yup.string().required('Required field').email('Invalid email address'),
  currency: yup.string().required('Required field'),
  paymethod: yup.string().required('Required field'),
  amount: yup.number()
    .required('Number is required')
    .min(0, 'Number must be greater than or equal to 0')
    .max(100, 'Number must be less than or equal to 100')
    .required('Required field'),
})


export default function Landing() {


  const INITIAL_VALUES = {
    walletAddress: "",
    email: "",
    currency: "",
    paymethod: "",
    amount: "",
  }

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: (values) => {


    },
    validationSchema
  })



  return (
    <BaseLayout>
      <div className="container-xl">
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <div className="card quick-trad">

              <div className="card-body">
                <div className="tab-content">


                </div>
              </div>
            </div>
          </div>
          <Orders />

        </div>
      </div>

    </BaseLayout>

  )
}




