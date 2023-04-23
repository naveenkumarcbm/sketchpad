import fs from "fs";
import { constants } from "./constants.js";

const rawFiles = fs.readdirSync(constants.RAW_DATA_DIR);
let id = 1;
const samples = [];
const genertateDataSet = (files) => {
  rawFiles.forEach((file) => {
    const content = fs.readFileSync(`${constants.RAW_DATA_DIR}/${file}`);
    const { session, student, drawings } = JSON.parse(content);
    for (const label in drawings) {
      if (Object.hasOwnProperty.call(drawings, label)) {
        samples.push({
          id,
          label,
          student_name: student,
          student_id: session,
        });
        id++;
      }
    }
  });
  fs.writeFileSync(constants.SAMPLE_DIR, JSON.stringify(samples));
};

genertateDataSet(rawFiles);
