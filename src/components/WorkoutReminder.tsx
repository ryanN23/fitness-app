import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, IonCheckbox, IonDatetime } from '@ionic/react';
import { LocalNotifications } from '@capacitor/local-notifications';
import './WorkoutReminder.css'

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getNextDayOfWeek = (dayName: string, reminderTime: string) => {
  const dayIndex = daysOfWeek.indexOf(dayName);
  const now = new Date();
  const resultDate = new Date();

  resultDate.setDate(now.getDate() + (7 + dayIndex - now.getDay()) % 7);
  const [hours, minutes] = reminderTime.split(':').map(Number);
  resultDate.setHours(hours, minutes, 0, 0);

  if (resultDate <= now) {
    resultDate.setDate(resultDate.getDate() + 7); // Next week
  }

  return resultDate;
};

const WorkoutReminder: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<{ [key: string]: boolean }>({});
  const [reminderTime, setReminderTime] = useState<string>("09:00"); // Default time

  const handleDayChange = (day: string) => {
    setSelectedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSetReminder = async () => {
    console.log('Setting reminders for:', selectedDays, 'at', reminderTime);
    for (const day of Object.keys(selectedDays)) {
      if (selectedDays[day]) {
        const scheduledTime = getNextDayOfWeek(day, reminderTime);
        console.log('Scheduling for:', day, 'at', scheduledTime);

        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Workout Time!',
              body: `Time to work out! It's ${day}!`,
              id: Math.random() * 10000,
              schedule: { at: scheduledTime },
            },
          ],
        });
      }
    }
    console.log('Reminders set for selected days.');
  };

  return (
    <div className='workout-reminder'>
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent>
        <IonList>
          {daysOfWeek.map(day => (
            <IonItem key={day}>
              <IonLabel>{day}</IonLabel>
              <IonCheckbox slot="end" checked={selectedDays[day] || false} onIonChange={() => handleDayChange(day)} />
            </IonItem>
          ))}
        </IonList>
        <IonDatetime presentation="time" value={reminderTime} onIonChange={e => setReminderTime(e.detail.value as string)} />
        <IonButton expand="block" onClick={handleSetReminder}>Set Reminder</IonButton>
      </IonContent>
    </IonPage>
    </div>
  );
};

export default WorkoutReminder;
