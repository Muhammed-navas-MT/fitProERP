        
        
{/* {activePackage && (
          <div className="mb-10">
            <div
              className="flex items-center gap-2 mb-4"
              style={{ color: "#f97316" }}
            >
              <Crown size={20} />
              <span className="text-sm text-orange-700 font-semibold uppercase tracking-wider">
                Your Current Plan
              </span>
            </div>

            <div
              className="relative overflow-hidden rounded-2xl border border-orange-600"
              style={{
                background: "[#0a0a0a]",
                boxShadow: "0 0 40px rgba(249, 115, 22, 0.15)",
              }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10"/>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold uppercase"
                        style={{
                          backgroundColor: "rgba(249, 115, 22, 0.2)",
                          color: "#f97316",
                        }}
                      >
                        Active
                      </span>
                      {activePackage.isDailySession && (
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                          style={{
                            backgroundColor: "rgba(34, 197, 94, 0.2)",
                            color: "#22c55e",
                          }}
                        >
                          <Zap size={12} />
                          Daily Session
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2">
                      {activePackage.name}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {formatDuration(activePackage.durationInDays)} plan
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activePackage.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                          >
                            <Check size={12} className="text-orange-500" />
                          </div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className="text-center md:text-right p-6 rounded-xl"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
                  >
                    <div className="text-gray-400 text-sm mb-1">
                      Current Price
                    </div>
                    <div className="text-4xl font-bold text-white">
                      ${activePackage.price.toFixed(2)}
                    </div>
                    <div className="text-gray-500 text-sm">
                      / {formatDuration(activePackage.durationInDays).toLowerCase()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}