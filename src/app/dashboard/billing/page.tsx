import { AlertTriangleIcon } from "lucide-react";
import { BillingForm } from "~/components/billing-form";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { getUser } from "~/lib/auth";
import { stripe } from "~/lib/stripe";
import { getUserSubscriptionPlan } from "~/lib/subscription";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Billing() {
  const user = await getUser();

  const subscriptionPlan = await getUserSubscriptionPlan(user?.id as string);

  console.log({ subscriptionPlan });

  // If user has a pro plan, check cancel status on Stripe.
  let isCanceled = false;
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }
  return (
    <div className="space-y-8 ">
      <Alert>
        <div className=" flex items-center gap-2">
          <AlertTriangleIcon className="h-6 w-6 shrink-0" />
          <div>
            <AlertDescription>
              <strong>ChadNext</strong> just demonstrates how to use Stripe in
              Next.js App router. Please use test cards from{" "}
              <a
                href="https://stripe.com/docs/testing#cards"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Stripe docs
              </a>
              .
            </AlertDescription>
          </div>
        </div>
      </Alert>
      <BillingForm
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
    </div>
  );
}
