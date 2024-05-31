import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/user/${id}`);
        console.log(res);
        setUserData(res.data.data);
        
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No User Data</div>;
  }

  return (
    <div className="p-4  ">
      <h1 className="text-2xl text-center font-bold mb-4">Edit User</h1>
      <Formik

        initialValues={{
          name: userData.name || '',
          age: userData.age || '',
          addresses: userData.addresses || [{ city: '', state: '', houseNo: '', country: '' }],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          age: Yup.number().required('Required').min(0, 'Invalid age'),
          addresses: Yup.array().of(
            Yup.object({
              city: Yup.string().required('Required'),
              state: Yup.string().required('Required'),
              houseNo: Yup.string().required('Required'),
              country: Yup.string().required('Required'),
            })
          ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axios.put(`http://localhost:4000/edit/${id}`, values);
            navigate("/");
          } catch (err) {
            console.error('Error updating user data:', err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className='w-4/12 m-auto ' >
            <div className="mb-4  ">
              <label className="block">Name</label>
              <Field name="name" type="text" className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block">Age</label>
              <Field name="age" type="number" className="border p-2 rounded w-full" />
            </div>
            <FieldArray name="addresses">
              {({ push, remove }) => (
                <div>
                  {values.addresses.map((address, index) => (
                    <div key={index} className="border p-2 mb-4">
                      <div className="mb-2">
                        <label className="block">City</label>
                        <Field name={`addresses.${index}.city`} type="text" className="border p-2 rounded w-full" />
                      </div>
                      <div className="mb-2">
                        <label className="block">State</label>
                        <Field name={`addresses.${index}.state`} type="text" className="border p-2 rounded w-full" />
                      </div>
                      <div className="mb-2">
                        <label className="block">House No</label>
                        <Field name={`addresses.${index}.houseNo`} type="text" className="border p-2 rounded w-full" />
                      </div>
                      <div className="mb-2">
                        <label className="block">Country</label>
                        <Field name={`addresses.${index}.country`} type="text" className="border p-2 rounded w-full" />
                      </div>
                      <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => push({ city: '', state: '', houseNo: '', country: '' })} className="bg-blue-500 text-white px-2 py-1 rounded">
                    Add Address
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit" disabled={isSubmitting} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUser;
