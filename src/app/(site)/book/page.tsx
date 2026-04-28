import BookingForm from '../../../components/modules/BookingForm';
import Navbar from '../../../components/shared/Navbar';

export default function BookPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24"> {/* যেন হেডার এর নিচে না ঢাকা পড়ে */}
        <BookingForm />
      </div>
    </main>
  );
}