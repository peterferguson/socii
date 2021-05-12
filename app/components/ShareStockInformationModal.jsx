import { Dialog, Transition } from "@headlessui/react";
import { alphaVantageQueryOptions } from "@lib/constants";
import { UserContext } from "@lib/context";
import PriceInput from "@components/PriceInput";
import MultiSelect from "@components/MultiSelect";
import { streamClient } from "@lib/stream";

import { Fragment, useState, useContext } from "react";
import { logoUrl } from "@utils/helper";

export default function ShareStockInformationModal({
  selectedGroup,
  tickerSymbol,
  openStockSharingModal,
  setOpenStockSharingModal,
  goClickHandler = () => {},
  pricePlaceholder = "0.00",
}) {
  const closeModal = () => setOpenStockSharingModal(false);
  const { user, username, userStreamToken } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [targetPrice, setTargetPrice] = useState(parseFloat(pricePlaceholder));
  const [selectedItems, setSelectedItems] = useState([]);

  const attachments = [
    {
      image: logoUrl(tickerSymbol),
      name: tickerSymbol,
      type: "stock",
      url: `http://localhost:3000/stock/${tickerSymbol}`,
    },
  ];

  const letsGoClickHander = async () => {
    closeModal();
    goClickHandler();

    if (username && userStreamToken) {
      await streamClient.connectUser(
        { id: username, name: user?.displayName },
        userStreamToken
      );
    }
    const channel = streamClient.getChannelById(
      "messaging",
      selectedGroup?.split(" ").join("-")
    );
    const message = await channel.sendMessage({
      text: `
        message: ${message} 
        targetPrice: ${targetPrice} 
        selectedItems: ${JSON.stringify(selectedItems)} 
      `,
      attachments,
      skip_push: true,
    });
  };

  return (
    <Transition appear show={openStockSharingModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto backdrop-filter backdrop-blur-lg"
        open={openStockSharingModal}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium text-gray-900 font-poppins"
              >
                Tell{" "}
                <span className="font-bold text-brand-light">
                  {selectedGroup}
                </span>{" "}
                about{" "}
                <span span className="font-bold text-teal-300">
                  {tickerSymbol}
                </span>
                !
              </Dialog.Title>
              <div className="mt-2">
                <div className="font-poppins text-sm text-blueGray-500">
                  Select some data to tell your friends about!
                </div>
                <MultiSelect
                  items={alphaVantageQueryOptions}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                />
                <div className="font-poppins text-sm text-blueGray-500">
                  Got a price in mind?
                </div>
                <div className="pt-1 pb-2">
                  <PriceInput
                    setPrice={setTargetPrice}
                    showPrice={false}
                    pricePlaceholder={pricePlaceholder}
                  />
                </div>
                <div className="font-poppins text-sm text-blueGray-500">
                  Tell them your thoughts!
                </div>
                <div className="mb-3 pt-2">
                  <textarea
                    className="form-textarea px-3 py-4 w-full placeholder-blueGray-300 text-blueGray-600 \
                      relative bg-white rounded-md text-sm border-gray-300 \
                      shadow-sm focus:outline-none focus:ring-teal-500 \
                      focus:border-teal-500 "
                    rows="4"
                    placeholder="Bruh the wallstreetbets bros love it!"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex mt-4">
                <div className="flex-grow" />
                <button
                  type="button"
                  className="flex-none justify-center px-4 py-2 text-sm font-medium \
                    text-teal-900 bg-teal-100 border border-transparent rounded-md \
                    hover:bg-teal-200 focus:outline-none focus-visible:ring-2 \
                    focus-visible:ring-offset-2 focus-visible:ring-teal-500"
                  onClick={letsGoClickHander}
                >
                  To the moon 🌕
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
