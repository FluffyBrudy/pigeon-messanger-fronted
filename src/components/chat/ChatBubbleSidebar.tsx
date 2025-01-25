import ChatBubble from "./ChatBubble";

const chatBubblesData = [
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/9436/9436366.png",
    name: "Rihanna",
    text: "Hello mate",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/8632/8632455.png",
    name: "John",
    text: "How are you?",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/1881/1881133.png",
    name: "Emily",
    text: "Good morning!sssssdddddddddddd",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/9436/9436366.png",
    name: "Alice",
    text: "Hey there! What's up?",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/8632/8632455.png",
    name: "Michael",
    text: "I'm doing well, thanks!",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/1881/1881133.png",
    name: "Sophia",
    text: "Good afternoon! How's your day going?",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/9436/9436366.png",
    name: "David",
    text: "What are your plans for today?",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/8632/8632455.png",
    name: "Olivia",
    text: "Just finished a great book!",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/1881/1881133.png",
    name: "James",
    text: "Looking forward to the weekend!",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/9436/9436366.png",
    name: "Isabella",
    text: "Have you seen the latest movie?",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/8632/8632455.png",
    name: "Liam",
    text: "I just got a new job!",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/1881/1881133.png",
    name: "Mia",
    text: "Can't wait for the concert next week!",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/9436/9436366.png",
    name: "Noah",
    text: "How's your family doing?",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/8632/8632455.png",
    name: "Ava",
    text: "Just got back from vacation!",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/1881/1881133.png",
    name: "Ethan",
    text: "What a beautiful day it is!",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/9436/9436366.png",
    name: "Charlotte",
    text: "I love this weather!",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/8632/8632455.png",
    name: "Lucas",
    text: "Have you tried that new restaurant?",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/1881/1881133.png",
    name: "Amelia",
    text: "Just got a new puppy!",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/9436/9436366.png",
    name: "Oliver",
    text: "What are you reading these days?",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/8632/8632455.png",
    name: "Harper",
    text: "I need some coffee!",
  },
  {
    imageUrl: "https://cdn-icons-png.freepik.com/256/1881/1881133.png",
    name: "Elijah",
    text: "Let's catch up soon!",
  },
];

const ChatBubbleSidebar = () => {
  return (
    <div className="flex flex-col gap-3 mt-2 ml-2 sm:mt-2 md:mt-4 md:ml-10 lg:mt-7 lg:ml-7 max-h-[100vh] overflow-y-scroll max-w-[400px]">
      {chatBubblesData.map((data, i) => (
        <ChatBubble key={i} {...data} />
      ))}
    </div>
  );
};

export default ChatBubbleSidebar;
