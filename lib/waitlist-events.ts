import type { Role } from "@/lib/validation";

export const WAITLIST_ROLE_EVENT = "waitlist:role";

/** Preselect a role in the waitlist form (e.g. from the "For clinics" button). */
export function selectWaitlistRole(role: Role) {
  window.dispatchEvent(new CustomEvent<Role>(WAITLIST_ROLE_EVENT, { detail: role }));
}
