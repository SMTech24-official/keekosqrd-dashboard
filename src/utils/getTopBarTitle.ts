export function getTopBarTitle(pathname: string): string {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/total-user":
      return "Total User";
    case "/add-driver":
      return "Add Driver";
    case "/total-driver":
      return "Total Driver";
    case "/add-service":
      return "Add Service";
    case "/booking-list":
      return "Booking List";
    case "/vehicles-track-list":
      return "Track List";
    case "/all-service":
      return "All Service";
    case "/coupon":
      return "Coupon";
    default:
      return "Dashboard";
  }
}
