// subName - the name of the property with Subscription
// default name is sub
export function AutoUnsubscribe(subName: string = 'sub') {
  return function (constructor) {
    const original = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      const sub = this[subName];

      if (sub) {
        sub.unsubscribe();
      }

      if (original && (typeof original === 'function')) {
        original.apply(this, arguments);
      }

      console.log(`Unsubscribe decorator is called. Subscription name is: ${subName}.`);
    };
  };
}
