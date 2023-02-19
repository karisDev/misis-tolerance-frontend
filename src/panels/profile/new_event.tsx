import { Icon24CameraOutline } from "@vkontakte/icons";
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
  File,
} from "@vkontakte/vkui";
import { FormEvent, useState } from "react";
import { withRouter } from "react-router-vkminiapps";

const ProfilePanelNewEvent = ({ router }: { router: any }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [valueName, setValueName] = useState("");
  const [valueLocation, setValueLocation] = useState("");
  const [valueTime, setValueTime] = useState("");
  const [valueDescription, setValueDescription] = useState("");
  const [valuePhoto, setValuePhoto] = useState<any>();
  const [valueTicketsCount, setValueTicketsCount] = useState(0);
  const [error, setError] = useState("");

  const onFileUpload = (e: any) => {
    setValuePhoto(e.target.files[0]);
  };

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

  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("https://pics.seizure.icu/api/upload.php", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    return result.url;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!valueName || !valueLocation || !valueTime || !valueDescription) {
      setError("Заполните все поля");
      return;
    }

    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(valueTime)) {
      setError("Неверный формат времени");
      return;
    }

    if (!valuePhoto) {
      setError("Загрузите фото");
      return;
    }

    if (!selectedDate) {
      setError("Выберите дату");
      return;
    }

    if (valueTicketsCount < 1) {
      setError("Количество билетов должно быть больше 0");
      return;
    }

    setError("");

    // upload image
    const imageSrc = await uploadImage(valuePhoto);

    // combine date and time
    const date = new Date(selectedDate);
    const time = valueTime.split(":");
    date.setHours(parseInt(time[0]));
    date.setMinutes(parseInt(time[1]));

    const formData = new FormData();
    formData.append("title", valueName);
    formData.append("place", valueLocation);
    formData.append("datetime", date.getTime().toString());
    formData.append("description", valueDescription);
    formData.append("image", valuePhoto);
    console.log(formData);
    // fetch("https://api.vk.com/method/photos.getMessagesUploadServer", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("Success:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <>
      <PanelHeader before={<PanelHeaderBack onClick={() => router.toBack()} />}>
        Новое мероприятие
      </PanelHeader>
      <Group>
        <FormLayout onSubmit={handleSubmit}>
          <FormItem top="Название">
            <Input
              name="name"
              placeholder="Олимпийский"
              required
              onChange={(e) => setValueName(e.target.value)}
            />
          </FormItem>
          <FormItem top="Место">
            <Input
              name="location"
              placeholder="Москва, Ленинский проспект, 103"
              required
              onChange={(e) => setValueLocation(e.target.value)}
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
            <Input
              name="time"
              placeholder="12:00"
              required
              onChange={(e) => setValueTime(e.target.value)}
            />
          </FormItem>
          <FormItem top="Краткое описание">
            <Input
              name="description"
              placeholder="Олимпийский"
              required
              onChange={(e) => setValueDescription(e.target.value)}
            />
          </FormItem>
          <FormItem top="Количество билетов">
            <Input
              name="ticketsCount"
              placeholder="100"
              required
              onChange={(e) => setValueTicketsCount(parseInt(e.target.value))}
            />
          </FormItem>
          {error && <Div style={{ color: "red" }}>{error}</Div>}

          <FormLayoutGroup mode="horizontal">
            <FormItem top="Загрузите ваше фото">
              <File
                onChange={onFileUpload}
                before={<Icon24CameraOutline role="presentation" />}
                size="m"
              >
                Открыть галерею
              </File>
            </FormItem>
            {valuePhoto && <p style={{ margin: 0 }}>{valuePhoto.name}</p>}
          </FormLayoutGroup>
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
