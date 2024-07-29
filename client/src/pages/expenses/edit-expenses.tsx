// // pages/expenses/edit-expense.tsx
// import React, { useState, useEffect } from 'react';
// import Layout from '@/components/layout';
// import Styles from '../../styles/expense.module.scss';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { GetServerSideProps } from 'next';

// interface Expense {
//   name: string | number | readonly string[] | undefined;
//   id: number;
//   amount: number;
//   payer: string;
//   participants: string[];
//   date: string;
//   notes: string;
// }


// interface EditExpenseProps {
//   expense: Expense;
// }

// const EditExpense = ({ expense }: EditExpenseProps) => {
//   const [formData, setFormData] = useState(expense);
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:3000/expenses/${expense.id}`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjIyNDQxNTYsImV4cCI6MTcyMjMzMDU1Nn0._UVyAwmDvSSF-QeRGGiZ_IbS1V7kq9Y_vbxdRK8ifiM"
//         }
//       });
//       router.push('/expenses/get-expenses'); 
//     } catch (error) {
//       console.error('Error updating expense:', error);
//     }
//   };

//   return (
//     // <div className={Styles.container}>
//     //   <h1 className={Styles.title}>Edit Expense</h1>
//     //   <form onSubmit={handleSubmit}>
//     //     <div>
//     //       <label>Name:</label>
//     //       <input
//     //         type="text"
//     //         name="name"
//     //         value={formData.name}
//     //         onChange={handleChange}
//     //       />
//     //     </div>
//     //     <div>
//     //       <label>Amount:</label>
//     //       <input
//     //         type="number"
//     //         name="amount"
//     //         value={formData.amount}
//     //         onChange={handleChange}
//     //       />
//     //     </div>
//     //     {/* Add other fields as necessary */}
//     //     <button type="submit">Edit</button>
//     //   </form>
//     // </div>
//     <Layout>
//       <div className={Styles.container}>
//         <h1>Edit Expense</h1>
//         <form onSubmit={handleSubmit} className={Styles.form}>
//           <label>
//             Name:
//             <input
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Amount:
//             <input
//               type="number"
//               value={formData.amount}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//            Payer:
//             <input
//               type="text"
//               value={formData.payer}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Participants:
//             <input
//               type="text"
//               value={formData.participants}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//           notes:
//             <input
//               type="text"
//               value={formData.notes}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//           notes:
//             <input
//               type="date"
//               value={formData.date}
//               onChange={handleChange}
//             />
//           </label>
//           <button type="submit">Edit Expense</button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.query;
//   if (!id) {
//     return {
//       notFound: true,
//     };
//   }
//   try {
//     const response = await axios.get(`http://localhost:3000/expenses/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjE5MDExNDQsImV4cCI6MTcyMTkwNDc0NH0.ntuc6z63IYwO6FSJo1LrVrw6HO8P8PVrICINnacOl1w" // Replace with actual token
//       }
//     });
//     return {
//       props: {
//         expense: response.data,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching expense:', error);
//     return {
//       notFound: true,
//     };
//   }
// };


// export default EditExpense;


import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import Styles from '../../styles/expense.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

interface Expense {
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
  const [formData, setFormData] = useState<Expense>(expense);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/expenses/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_JWT_TOKEN_HERE"
        }
      });
      router.push('/expenses/get-expenses'); 
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  return (
    <Layout>
      <div className={Styles.container}>
        <h1>Edit Expense</h1>
        <form onSubmit={handleSubmit} className={Styles.form}>
          <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label>
            Payer:
            <input
              type="text"
              name="payer"
              value={formData.payer}
              onChange={handleChange}
            />
          </label>
          <label>
            Participants:
            <input
              type="text"
              name="participants"
              value={formData.participants.join(', ')}
              onChange={handleChange}
            />
          </label>
          <label>
            Notes:
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
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
  if (!id || Array.isArray(id)) {
    return {
      notFound: true,
    };
  }
  try {
    const response = await axios.get(`http://localhost:3000/expenses/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYwLCJpYXQiOjE3MjIyNDQxNTYsImV4cCI6MTcyMjMzMDU1Nn0._UVyAwmDvSSF-QeRGGiZ_IbS1V7kq9Y_vbxdRK8ifiM "
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
