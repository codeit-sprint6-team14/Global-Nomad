import CardFooter from '@/components/Cards/components/cardFooter';
import type { Meta, StoryObj } from '@storybook/react';

// import React from 'react';

const meta: Meta<typeof CardFooter> = {
  title: 'Card/CardFooter',
  component: CardFooter,
  argTypes: {
    text: { control: 'text' },
    status: {
      control: 'select',
      options: ['pending', 'completed'],
    },
    imgSrc: { control: 'text' },
    buttonName: { control: 'text' },
    additionalClassNames: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CardFooter>;

export const StatusPendingFooter: Story = {
  args: {
    text: '50,000원',
    status: 'pending',
    buttonName: '예약 취소',
  },
};

export const StatusCompletedFooter: Story = {
  args: {
    text: '50,000원',
    status: 'completed',
    buttonName: '후기 작성',
  },
};

export const MyActivityCardFooter: Story = {
  args: {
    text: '50,000원',
    imgSrc: '/assets/icons/kebab.svg',
  },
};

// export const InteractiveCardFooter: Story = {
//   render: function RenderInteractiveCardFooter(args) {
//     const [isMyActivity, setIsMyActivity] = React.useState(false);
//     const [reservationStatus, setReservationStatus] = React.useState<'pending' | 'completed'>('pending');

//     return (
//       <div>
//         <div style={{ marginBottom: '1rem' }}>
//           <button onClick={() => setIsMyActivity(!isMyActivity)} style={{ marginRight: '1rem' }}>
//             Toggle Card Type
//           </button>
//           {!isMyActivity && (
//             <button onClick={() => setReservationStatus(reservationStatus === 'pending' ? 'completed' : 'pending')}>
//               Toggle Reservation Status
//             </button>
//           )}
//         </div>
//         <CardFooter
//           {...args}
//           text="50,000원"
//           status={isMyActivity ? undefined : reservationStatus}
//           imgSrc={isMyActivity ? '/assets/icons/kebab.svg' : undefined}
//           buttonName={!isMyActivity ? (reservationStatus === 'pending' ? '예약 취소' : '후기 작성') : undefined}
//         />
//       </div>
//     );
//   },
// };
