import express from "express";

const router = express.Router();

// 메모리에 사용자 이름을 저장하기 위한 변수
let userNames = [];

// POST 요청으로 사용자 이름 2개를 받아 저장
router.post("/names", (req, res) => {
  const { name1, name2 } = req.body;

  if (!name1 || !name2) {
    return res.status(400).json({ message: "Both names are required." });
  }

  // 사용자 이름 저장 (메모리)
  userNames = [name1, name2];

  return res.status(200).json({ message: "Names have been saved successfully." });
});

// GET 요청으로 저장된 사용자 이름 반환
router.get("/names", (req, res) => {
  if (userNames.length === 0) {
    return res.status(404).json({ message: "No names found." });
  }

  return res.status(200).json({ names: userNames });
});

export default router;
