/*
 * Tests to provide complete test coverage for DojoAMDResolvePlugin.  These Tests
 * exercise code paths that are difficult or impossible to invoke from within
 * webpack.  As such, they provide only enough scafoliding to support
 * execution of the targeted paths.  Code changes to the module under
 * test may require additional scafolding in this file, even if the code
 * changes are not related to the paths being tested.
 */
const DojoAMDResolverPlugin = require("../lib/DojoAMDResolverPlugin");

describe("DojoAMDResolverPlugin tests", function() {
	const plugin = new DojoAMDResolverPlugin({});
	var moduleCallback;
	beforeEach(function() {
		plugin.apply({
			resolvers: {
				normal: {
					plugin: (event, callback) => {
						if (event === "module") {
							moduleCallback = callback;
						}
					}
				}
			},
			plugin: (event, callback) => {
				if (event === "normal-module-factory") {
					callback();
				}
			},
			applyPluginsBailResult(event) {
				if (event === "get dojo require") {
					return {
						toUrl: (request) => {
							return request.request === "null" ? null : request.request;
						}
					};
				}
			}
		});
	});
	describe("resolver tests", () => {
		it("Should invoke callback with no args for directory request", done => {
			moduleCallback({directory:true}, (err, data) => {
				(typeof err).should.be.eql('undefined');
				(typeof data).should.be.eql('undefined');
				done();
			});
		});
		it("Should invoke callback with no args for null request", done => {
			moduleCallback({request: "null", path:"."}, (err, data) => {
				(typeof err).should.be.eql('undefined');
				(typeof data).should.be.eql('undefined');
				done();
			});
		});
		it("Should invoke callback with no args for identity request", done => {
			moduleCallback({request: "null", path:"."}, (err, data) => {
				(typeof err).should.be.eql('undefined');
				(typeof data).should.be.eql('undefined');
				done();
			});
		});
	});
});