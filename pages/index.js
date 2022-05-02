import Head from 'next/head';
import * as Yup from 'yup';
import NumberFormat from "react-number-format";
import { Card, Box, TextInput, PasswordInput, Group, Button } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';

import styles from '../styles/Home.module.css';
import { payments } from './api/hello';

const schema = Yup.object().shape({
  CardNumber: Yup.string()
    .required('Обязательное поле')
    .matches(/^[0-9]+$/gi, "Только число")
    .min(16, 'Должно быть 16 символов')
    .max(16, 'Должно быть 16 символов'),
  ExpDate: Yup.string()
    .required('Обязательное поле'),
  // .min(7, 'Поле должно быть заполнено')
  // .max(7, 'Поле должно быть заполнено'),
  // .matches(/^[0-9]+$/gi, "Только число"),
  Cvv: Yup.string()
    .required('Обязательное поле')
    .matches(/^[0-9]+$/gi, "Только число")
    .min(3, 'Должно быть 3 символа')
    .max(3, 'Должно быть 3 символа'),
  Amount: Yup.string()
    .required('Обязательное поле')
    .min(1, 'Введите сумму')
    .matches(/^[0-9]+$/gi, "Только число"),
});

export default function Home() {
  const form = useForm({
    initialValues: {
      CardNumber: '',
      ExpDate: '',
      Cvv: '',
      Amount: '',
    },
    schema: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    await payments(values.CardNumber, values.ExpDate, values.Cvv, values.Amount)
      .then((res) => {
        console.log(res);

        form.reset();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Payment App</title>
        <meta name="description" content="Payment App" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <main
        className={styles.main}
      >
        <Card
          shadow="sm"
          p="lg"
          style={{
            borderRadius: "20px",
            maxWidth: 400,
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '100%'
            }}
            mx="auto"
          >
            <form
              onSubmit={form.onSubmit((values) => handleSubmit(values))}
            >

              <NumberFormat
                required
                minLength={16}
                maxLength={16}
                label="Номер карты"
                placeholder="Номер карты"
                onChange={() => console.log('asd')}
                customInput={TextInput}
                className={styles.text}
                {...form.getInputProps('CardNumber')}
              />

              <Group>
                <NumberFormat
                  required
                  format="##/####"
                  label="Срок действия карты"
                  placeholder="MM/YYYY"
                  style={{
                    flexGrow: "1"
                  }}
                  customInput={TextInput}
                  className={styles.text}
                  {...form.getInputProps('ExpDate')}
                />

                <PasswordInput
                  required
                  minLength={3}
                  maxLength={3}
                  label="CVV"
                  placeholder="CVV"
                  style={{
                    flexGrow: "1"
                  }}
                  className={styles.text}
                  {...form.getInputProps('Cvv')}
                />
              </Group>

              <NumberFormat
                required
                label="Сумма"
                placeholder="Сумма"
                customInput={TextInput}
                className={styles.text}
                {...form.getInputProps('Amount')}
              />

              <Group
                position="right"
                mt="md"
              >
                <Button
                  type="submit"
                  style={{
                    width: '100%',
                  }}
                  className={styles.button}
                >
                  Оплатить
                </Button>
              </Group>
            </form>
          </Box>
        </Card>


      </main>

    </div >
  )
};
