import React, { useEffect, useState } from "react";
import { indexCriterias } from "../../api/criteriaController";
import { storeScore } from "../../api/scoreController";

const JudgeLayout = () => {
  const [textInput, setTextInput] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCriteria();
  }, []);

  const fetchCriteria = async () => {
    setLoading(true);
    const res = await indexCriterias();

    const filteredCriterias = res.filter((item) => item.category_id === 4);

    setTextInput(filteredCriterias);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formInputs = Array.from(e.target.elements)
        .filter((el) => el.tagName === "INPUT")
        .map((el) => ({ id: el.id, value: el.value }));

      const res = await storeScore();

      console.log(formInputs);

      // Do something with the form inputs, such as sending them to an API endpoint
    } catch (error) {
      console.error(error); // Optional: Handle the error if needed
    }
  };

  return (
    <>
      {loading ? null : (
        <form onSubmit={handleSubmit}>
          {textInput.map((item) => (
            <>
              <div key={item.id}>
                <label for={item.id}>
                  {item.criteriaName} :<input type="text" id={item.id} />
                </label>
              </div>
            </>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default JudgeLayout;
