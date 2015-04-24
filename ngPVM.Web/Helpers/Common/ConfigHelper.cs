using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace ngPVM.Web.Helpers.Common
{
  public class ConfigHelper
  {
    public static string GetAppSetting(string name, bool throwOnMissing = true)
    {
      var rootWebConfig = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("~/");
      var missingException = string.Format("\"{0}\" name not found in the web.config appSettings.", name);
      if (rootWebConfig.AppSettings.Settings.Count > 0)
      {
        var setting = rootWebConfig.AppSettings.Settings[name];
        if (setting != null)
          return setting.Value;
        if (throwOnMissing)
          throw new ConfigurationErrorsException(missingException);
        return string.Empty;
      }
      if (throwOnMissing)
        throw new ConfigurationErrorsException(missingException);
      return string.Empty;
    }

    public static void SetAppSetting(string name, string value)
    {
      var rootWebConfig = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("~/");
      var setting = rootWebConfig.AppSettings.Settings[name];
      if (setting == null)
      {
        rootWebConfig.AppSettings.Settings.Add(new KeyValueConfigurationElement(name, value));
      }
      else
      {
        setting.Value = value;
      }
      rootWebConfig.Save();
    }
  }
}