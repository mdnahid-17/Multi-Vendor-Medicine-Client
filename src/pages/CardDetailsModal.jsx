import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Fragment } from 'react'

const CardDetailsModal = ({ isOpen, closeModal,product, maxWidth = "max-w-md" }) => {


   if (!product) return null;
  return (
    <div>
 <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>

        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        {/* Modal Center */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel
              className={`w-full ${maxWidth} rounded-xl bg-white p-6 shadow-lg`}
            >
              <DialogTitle className="text-xl font-bold mb-2">
                {product?.name}
              </DialogTitle>

              <div className="space-y-2">
                <p><strong>Category:</strong> {product?.category}</p>
                <p><strong>Company:</strong> {product?.company}</p>
                <p><strong>Price Per Unit:</strong> {product?.price_per_unit}</p>
                <p><strong>Description:</strong> {product?.description}</p>

                {/* Product image (if needed) */}
                {product?.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover py-3 rounded-lg border"
                  />
                )}
              </div>

              <button
                onClick={closeModal}
                className="mt-5 w-full rounded bg-blue-600 py-2 text-white"
              >
                Close
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  
    </div>
  );
};

export default CardDetailsModal;
