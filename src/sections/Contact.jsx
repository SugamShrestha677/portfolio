import RevealOnScroll from "../Ui/RevealScroll";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="lg:w-[95%] w-full min-h-screen m-auto rounded-xl grid grid-cols-1 xl:px-36 px-6 py-20 gap-10"
    >
      <RevealOnScroll>
        <div className="px-1 w-full">
          <h2 className="max-w-full text-4xl font-semibold mb-12 bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent text-center ">
            Get In touch
          </h2>

          <form
          name="contact" method="POST" data-netlify="true"
            className="space-y-6"
          >
  <input type="hidden" name="form-name" value="contact" />
            <div className="">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name..."
                required
                className="w-full bg-white/10 border border-white/10 rounded  px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 "
              />
            </div>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                required
                className="w-full bg-white/10 border border-white/10 rounded  px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 "
              />
            </div>
            <div className="relative">
              <textarea
                type="message"
                id="message"
                name="message"
                rows={6}
                placeholder="Type your message..."
                required
                className="w-full bg-white/10 border border-white/10 rounded  px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5 "
              />
            </div>

            <button
              type="submit"
              className=" w-full bg-gradient-to-r flex justify-center cursor-pointer from-teal-500 to-indigo-600 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]  py-3 "
            >
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
};


export default Contact

