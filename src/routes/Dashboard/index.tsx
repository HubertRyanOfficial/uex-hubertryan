import Header from "@/components/Header";
import ContactWrapper from "../../components/contact/ContactWrapper";
import MapsProvider from "@/contexts/MapsContext";

export default function Dashboard() {
  return (
    <div className="w-full min-h-[100vh] flex flex-col bg-gray-50">
      <Header />
      <MapsProvider>
        <main className="w-full h-[94vh] flex flex-col justify-center items-center">
          <ContactWrapper />
        </main>
      </MapsProvider>
    </div>
  );
}
