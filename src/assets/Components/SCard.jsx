/* eslint-disable react/prop-types */
const SCard = (props) => {
  return (
    <div className="max-w-md bg-[#E2EBEB] shadow-lg rounded-lg overflow-hidden mb-4">
      <div className="px-6 py-4">
        <div className="text-center mb-2">
          <div className="text-xl font-bold text-gray-900">{props.name}</div>
        </div>
        <p className="text-sm text-gray-600">{props.about}</p>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-600">Last Date:</p>
            <p className="text-sm text-gray-700">{props.lastDate}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">Amount:</p>
            <p className="text-sm text-gray-700">{props.amount}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">Eligibility:</p>
            <p className="text-sm text-gray-700">{props.eligibility}</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <a
            href="#"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default SCard;
