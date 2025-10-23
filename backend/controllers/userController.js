import axios from 'axios';

export const getUserFromClerkById = async (req, res) => {
  try {
    const { userId } = req.params;

    const dataReceived = await axios.get(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    const name = dataReceived.data.last_name + " " + dataReceived.data.first_name;
    const imgUrl = dataReceived.data.image_url;

    res.status(200).json({ user: { name, imgUrl } });
  } catch (error) {
    console.error("Lỗi lấy user từ Clerk:", error.response?.data || error.message);
    res.status(500).json({ error: "Không thể lấy thông tin user từ Clerk" });
  }
}