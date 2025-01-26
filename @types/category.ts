export interface Category {
  id: number;
  name: string;
  benefits: string;
}

export enum HerbGroup {
  Reducebloodfat = "ลดไขมันในเส้นเลือด",
  Treatskindiseasesitchyrashesringworm = "รักษาโรคผิวหนัง ผื่นคัน กลากเกลื้อน",
  Nourishtheheart = "บำรุงหัวใจ",
  Takewormmedicine = "ถ่ายพยาธิ",
  Laxative = "ยาถ่าย",
}