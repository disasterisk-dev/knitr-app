const Create = () => {
  return (
    <section className="w-full">
      <h2>New Project</h2>
      <form className="flex flex-col justify-stretch">
        <label htmlFor="title">Name</label>
        <input type="text" name="title" />

        <label htmlFor="colors">Palette</label>
        <input type="color" name="" id="" />
      </form>
    </section>
  );
};

export default Create;
