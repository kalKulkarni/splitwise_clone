// pages/expenses/edit-expense.tsx
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import Styles from '../../styles/expense.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

interface Expense {
  name: string | number | readonly string[] | undefined;
  id: number;
  amount: number;
  payer: string;
  participants: string[];
  date: string;
  notes: string;
}


interface EditExpenseProps {
  expense: Expense;
}

const EditExpense = ({ expense }: EditExpenseProps) => {
  const [formData, setFormData] = useState(expense);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/expenses/${expense.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjE5NzMxNjgsImV4cCI6MTcyMjA1OTU2OH0.orBYlqBfgxwPknhTOJBP0SVKAlMv5a0W6gG3vj4vb6s"
        }
      });
      router.push('/expenses/get-expenses'); 
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    // <div className={Styles.container}>
    //   <h1 className={Styles.title}>Edit Expense</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Name:</label>
    //       <input
    //         type="text"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div>
    //       <label>Amount:</label>
    //       <input
    //         type="number"
    //         name="amount"
    //         value={formData.amount}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     {/* Add other fields as necessary */}
    //     <button type="submit">Edit</button>
    //   </form>
    // </div>
    <Layout>
      <div className={Styles.container}>
        <h1>Edit Expense</h1>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <label>
            Name:
            <input
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label>
           Payer:
            <input
              type="text"
              value={formData.payer}
              onChange={handleChange}
            />
          </label>
          <label>
            Participants:
            <input
              type="text"
              value={formData.participants}
              onChange={handleChange}
            />
          </label>
          <label>
          notes:
            <input
              type="text"
              value={formData.notes}
              onChange={handleChange}
            />
          </label>
          <label>
          notes:
            <input
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Edit Expense</button>
        </form>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  if (!id) {
    return {
      notFound: true,
    };
  }
  try {
    const response = await axios.get(`http://localhost:3000/expenses/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjE5MDExNDQsImV4cCI6MTcyMTkwNDc0NH0.ntuc6z63IYwO6FSJo1LrVrw6HO8P8PVrICINnacOl1w" // Replace with actual token
      }
    });
    return {
      props: {
        expense: response.data,
      },
    };
  } catch (error) {
    console.error('Error fetching expense:', error);
    return {
      notFound: true,
    };
  }
};


export default EditExpense;
