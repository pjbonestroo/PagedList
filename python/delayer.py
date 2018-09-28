class Delayer():
    """ Simple delayer to call functions not too many times in a certain timespan. """

    def __init__(self, timespan):
        self.timespan = timespan # timespan in milliseconds
        self.lastTime = None # last time executed in milliseconds since 1970/01/01
        self.functionHolder = None
    
    def now(self):
        return __new__(Date()).getTime()

    def execute(self, func):
        """ Function func gets executed (without arguments) if no other funcion is executed for a certain timespan.
        Otherwise the function is remembered and executed when the time is elapsed.
        If other calls are done in the meantime, only the last function gets executed when time is elapsed.
        If an other function call is just finished, this call will execute immediately.
        """
        if self.lastTime == None:
            self.executeNow(func)
        else:
            waitTime = self.lastTime + self.timespan - self.now()
            if waitTime < 0:
                self.executeNow(func)
            else:
                if self.functionHolder == None:
                    # place new timeout
                    self.functionHolder = func
                    def executeLater():
                        self.executeNow(self.functionHolder)
                        self.functionHolder = None
                        self.lastTime = None
                    setTimeout(executeLater, waitTime)
                else:
                    # hold new function for already placed timeout
                    self.functionHolder = func

    def executeNow(self, func):
        self.lastTime = self.now()
        func()


class Delayer2():
    """ Even simpler delayer which always delays on first hit. Optional time reset during executing subsequent calls. """

    def __init__(self, timespan, resetDelay = False):
        self.timespan = timespan # timespan in milliseconds
        self.resetDelay = resetDelay
        self.lastTimeout = None
        self.hitTime = None

    def now(self):
        return __new__(Date()).getTime()

    def execute(self, func):
        """ Function func gets executed (without arguments) after timespan.
            If another function was already waiting, that one is canceled,
            and this new function will be executed instead of the old one,
            on the time the old one was scheduled (if resetDelay is false),
            or after a fresh delay (if resetDelay is true).
        """
        def execute_(f):
            f()
            self.lastTimeout = None
        if self.lastTimeout == None:
            self.lastTimeout = setTimeout(execute_.bind(None, func), self.timespan)
            self.hitTime = self.now()
        else:
            clearTimeout(self.lastTimeout)
            timeLeft = 0.0
            if self.resetDelay:
                timeLeft = self.timespan
            else:
                timeLeft = Math.max(0, self.timespan - (self.now() - self.hitTime))
            self.lastTimeout = setTimeout(execute_.bind(None, func), timeLeft)

