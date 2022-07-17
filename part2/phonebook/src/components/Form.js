import InputLine from './InputLine';

const Form = ({ handleSubmit, nameObj, numberObj }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputLine name={nameObj.name} value={nameObj.value} onChange={nameObj.handler} />
        <InputLine name={numberObj.name} value={numberObj.value} onChange={numberObj.handler} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Form
