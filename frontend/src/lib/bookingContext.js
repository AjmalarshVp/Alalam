// Lightweight module-level store for passing non-sensitive booking context
// (source page, section, selected package) from Book Now buttons to the form.
// This is purely metadata for the spreadsheet — no PII is stored here.

let _ctx = {};

export const setBookingContext = (ctx) => {
  _ctx = ctx;
};

export const getBookingContext = () => _ctx;

export const clearBookingContext = () => {
  _ctx = {};
};
