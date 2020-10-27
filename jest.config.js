module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**",
    ],
    coverageReporters: ["text-summary", "html"],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
};
