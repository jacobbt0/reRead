import React, { useEffect, useState } from 'react';

import { motion } from "framer-motion";
import { useProductStore  } from '../stores/useProductStore';
import MyBooks from '../components/MyBooks';
const AccountPage = () => {

    const { fetchAccountData, myProducts } = useProductStore()
    console.log(myProducts)

    useEffect(()=>{
        fetchAccountData()
    },[fetchAccountData])
  return (
    <div>
      <h1
      className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8'
      >My Books</h1>
      <motion.div
					className='mx-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
          {myProducts.map((product) => (
            <MyBooks product={product}/>
          ))}
        </motion.div>
      
    </div>
  );
};

export default AccountPage;
