import {
  PanelHeader,
  Group,
  PanelHeaderBack,
  Div,
  FormLayout,
  FormItem,
  Input,
  DatePicker,
  FormLayoutGroup,
  Button,
} from "@vkontakte/vkui";
import { FormEvent, useState } from "react";
import { withRouter } from "react-router-vkminiapps";

const ProfilePanelNewEvent = ({ router }: { router: any }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = ({
    day,
    month,
    year,
  }: {
    day: number;
    month: number;
    year: number;
  }) => {
    // convert to date
    setSelectedDate(new Date(year, month, day));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => router.toBack()} />}
      ></PanelHeader>
      <Group>
        <FormLayout onSubmit={handleSubmit}>
          <FormItem top="Название">
            <Input name="name" placeholder="Олимпийский" required />
          </FormItem>
          <FormItem top="Место">
            <Input
              name="location"
              placeholder="Москва, Ленинский проспект, 103"
              required
            />
          </FormItem>
          <FormItem top="Дата проведения">
            <DatePicker
              min={{
                day: new Date().getDate(),
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
              }}
              onDateChange={handleDateChange}
              dayPlaceholder="ДД"
              monthPlaceholder="ММ"
              yearPlaceholder="ГГГГ"
            />
          </FormItem>
          <FormItem top="Время проведения">
            <Input name="time" placeholder="12:00" required />
          </FormItem>
          <FormItem top="Краткое описание">
            <Input name="description" placeholder="Олимпийский" required />
          </FormItem>
          <FormItem>
            <Button type="submit" size="l" stretched>
              Создать
            </Button>
          </FormItem>
        </FormLayout>
      </Group>
    </>
  );
};

export default withRouter(ProfilePanelNewEvent);
