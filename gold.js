// ========= ID ========= //
const mapping = {
    'Locket': ['pro', 'locket_1600_1y']
};
// =========   Phần cố định  ========= // 
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = JSON.parse($response.body);
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";
obj.subscriber = obj.subscriber || { subscriptions: {}, entitlements: {} };
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};
var expirationDate = "9999-01-09T10:10:14Z";
var purchaseDate = "2026-01-09T10:10:14Z";
var productId = "locket_1600_1y";
var subInfo = {
    is_sandbox: true,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: expirationDate,
    grace_period_expires_date: null,
    refunded_at: null,
    unsubscribe_detected_at: null,
    original_purchase_date: purchaseDate,
    purchase_date: purchaseDate,
    store: "app_store",
    store_transaction_id: "2000001108724193",
    ownership_type: "PURCHASED"
};
var entitlementInfo = {
    grace_period_expires_date: null,
    purchase_date: purchaseDate,
    product_identifier: productId,
    expires_date: expirationDate
};
const match = Object.keys(mapping).find(e => ua.includes(e));
let entitlementKey = "pro";
let subKey = "locket_1600_1y";
if (match) {
    let [ent, sub] = mapping[match];
    if (ent) entitlementKey = ent;
    if (sub) subKey = sub;
}
subInfo.product_identifier = subKey;
entitlementInfo.product_identifier = subKey;
obj.subscriber.subscriptions[subKey] = subInfo;
obj.subscriber.entitlements[entitlementKey] = entitlementInfo;
$done({
    body: JSON.stringify(obj)
});
