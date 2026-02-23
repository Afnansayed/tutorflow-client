import { reviewService } from "@/service/review.service";
import AdminReviewManagementClient from "./_components/AdminReviewManagementClient";


const AdminReviewPage = async () => {
  const response = await reviewService.getAllReview();
  const reviews = response?.data?.data || [];

  return <AdminReviewManagementClient initialReviews={reviews} />;
};

export default AdminReviewPage;