// pages/expenses/edit-expense.tsx
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import Styles from '../../styles/expense.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Expense {
  id: number;
  amount: number;
  payer: string;
  participants: string[];
  date: string;
  notes: string;
}

const EditExpense = () => {
  const [expense, setExpense] = useState<Expense | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchExpense = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/expenses/${id}`);
          setExpense(response.data);
        } catch (error) {
          console.error('Error fetching expense:', error);
        }
      };
      fetchExpense();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => prevExpense ? { ...prevExpense, [name]: value } : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (expense) {
      try {
        await axios.put(`http://localhost:3000/expenses/${expense.id}`, expense, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcyMTc0MTMxOCwiZXhwIjoxNzIxODI3NzE4fQ.2JpE1_3xARCU1dQIQOoSvnvpKHQRz6ljZX4d9xlPTBc" 
          }
        });
        router.push('/expenses/get-expenses');
      } catch (error) {
        console.error('Error updating expense:', error);
      }
    }
  };

  if (!expense) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={Styles.container}>
        <h1 className={Styles.title}>Edit Expense</h1>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Payer:
            <input
              type="text"
              name="payer"
              value={expense.payer}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Participants:
            <input
              type="text"
              name="participants"
              value={expense.participants.join(',')}
              onChange={(e) => setExpense((prevExpense) => prevExpense ? { ...prevExpense, participants: e.target.value.split(',') } : null)}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Notes:
            <input
              type="text"
              name="notes"
              value={expense.notes}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Update Expense</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditExpense;
